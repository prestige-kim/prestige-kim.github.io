import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the personal portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Myeongseong Kim — AI Developer<\/title>/i);
  assert.match(html, /Building useful/);
  assert.match(html, /Handong Global University/);
  assert.match(html, /Impactive-AI/);
  assert.match(html, /Google AI Agent Challenge 2026/);
  assert.match(html, /proudchris@icloud\.com/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("starter preview infrastructure is removed from the finished site", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"use client"/);
  assert.match(page, /IntersectionObserver/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview|codex-preview/);
  assert.match(layout, /title:\s*"Myeongseong Kim — AI Developer"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});

test("navigation has a cancellable scroll controller and mobile Connect entry", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /navigationFrameRef/);
  assert.match(page, /window\.history\.pushState/);
  assert.match(page, /handleSectionNavigation/);
  assert.match(page, /className=\{activeSection === "connect" \? "mobile-connect is-active"/);
  assert.match(page, /id="timeline"/);
  assert.match(page, /TIMELINE/);
  assert.match(page, /temporary-profile\.jpg/);
  assert.doesNotMatch(page, /TEMPORARY AVATAR|A placeholder until the right portrait arrives/);
});
