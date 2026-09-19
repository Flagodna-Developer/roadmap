#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

function readYaml(name) {
  const data = yaml.load(fs.readFileSync(path.join(ROOT, name), "utf8"));
  if (!data || typeof data !== "object") {
    throw new Error(`${name} is empty or invalid`);
  }
  return data;
}

const HEADER = readYaml("header.yml");
const ROADMAP_DATA = readYaml("roadmap.yml");

if (!HEADER.site) {
  throw new Error("header.yml is missing the `site` section");
}
if (Array.isArray(ROADMAP_DATA) || !Object.keys(ROADMAP_DATA).length) {
  throw new Error("roadmap.yml needs at least one lane (now, next, later...)");
}

const SITE = HEADER.site;
const NAV = HEADER.nav || {};
const ROADMAP = ROADMAP_DATA;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Matches http(s) URLs in already-escaped text (stops before &quot; / &lt; / &gt;)
const URL_RE = /https?:\/\/(?:(?!&quot;|&lt;|&gt;)\S)+/g;

// Turns URLs in an escaped string into <a class="note-link"> anchors.
// Trailing punctuation like "." or ")" stays outside the link.
function linkify(escaped) {
  return escaped.replace(URL_RE, (match) => {
    const trail = match.match(/[.,:!?)\]]+$/)?.[0] || "";
    const url = trail ? match.slice(0, -trail.length) : match;
    return `<a class="note-link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>${trail}`;
  });
}

function renderTopbar(nav) {
  const brand = nav.brand;
  const links = nav.links || [];
  if (!brand && !links.length) return "";

  const brandHtml = brand
    ? `<a class="brand" href="${escapeHtml(brand.href || "/")}">
          ${
            brand.logo
              ? `<img src="${escapeHtml(
                  brand.logo
                )}" alt="" width="24" height="24" />`
              : ""
          }
          <span>${escapeHtml(brand.label || "")}</span>
        </a>`
    : "";

  const linksHtml = links.length
    ? `<nav class="topbar-links" aria-label="Site">
          ${links
            .map(
              (link) =>
                `<a class="nav-link" href="${escapeHtml(
                  link.href
                )}">${escapeHtml(link.label)}</a>`
            )
            .join("\n          ")}
        </nav>`
    : "";

  return `<header class="topbar">
      <div class="topbar-inner">
        ${brandHtml}
        ${linksHtml}
      </div>
    </header>`;
}

function renderItem(item) {
  const project = item.project
    ? `<span class="tag">${escapeHtml(item.project)}</span>`
    : "";
  const note = item.note
    ? `<p class="note">${linkify(escapeHtml(item.note))}</p>`
    : "";

  return `<article class="card">
    ${project}
    <h3>${escapeHtml(item.title)}</h3>
    ${note}
  </article>`;
}

function renderColumn(key, column) {
  const items = (column.items || []).map(renderItem).join("\n");
  const empty = items ? "" : `<p class="empty">Nothing listed yet.</p>`;

  return `<section class="column" data-lane="${escapeHtml(key)}">
    <header class="column-head">
      <p class="hint">${escapeHtml(column.hint || "")}</p>
      <h2>${escapeHtml(column.label || key)}</h2>
    </header>
    <div class="stack">
      ${items}${empty}
    </div>
  </section>`;
}

function stamp() {
  return new Date().toISOString().slice(0, 10);
}

function generate() {
  const template = fs.readFileSync(path.join(ROOT, "template.html"), "utf8");
  const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

  const columns = Object.entries(ROADMAP)
    .map(([key, column]) => renderColumn(key, column || {}))
    .join("\n");

  const html = template
    .replaceAll("{{TITLE}}", escapeHtml(SITE.title))
    .replaceAll("{{KICKER}}", escapeHtml(SITE.kicker || ""))
    .replaceAll("{{INTRO}}", escapeHtml(SITE.intro))
    .replaceAll("{{TOPBAR}}", renderTopbar(NAV))
    .replaceAll("{{STYLES}}", css)
    .replaceAll("{{STAMP}}", stamp())
    .replaceAll("{{COLUMNS}}", columns);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, "index.html"), html);
  console.log("wrote dist/index.html");
}

generate();
