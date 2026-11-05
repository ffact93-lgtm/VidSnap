const form = document.getElementById("downloadForm");
const urlInput = document.getElementById("mediaUrl");
const nameInput = document.getElementById("fileName");
const formatSelect = document.getElementById("format");
const permissionCheck = document.getElementById("permissionCheck");
const statusBox = document.getElementById("status");

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("pasteBtn").addEventListener("click", async () => {
  try {
    const value = await navigator.clipboard.readText();
    if (value) urlInput.value = value.trim();
    else setStatus("Clipboard is empty. Paste your link into the field.", false);
  } catch {
    urlInput.focus();
    setStatus("Clipboard access is unavailable. Paste your link manually.", false);
  }
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.querySelector(".nav-links");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));

function setStatus(message, success) {
  statusBox.textContent = message;
  statusBox.className = success ? "status success" : "status";
}
function isYoutubeHost(host) {
  return host === "youtube.com" || host.endsWith(".youtube.com") ||
         host === "youtu.be" || host.endsWith(".youtu.be");
}
function safeFilename(value) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setStatus("", false);

  let parsed;
  try {
    parsed = new URL(urlInput.value.trim());
  } catch {
    setStatus("Please enter a valid, complete URL starting with https://", false);
    urlInput.focus();
    return;
  }
  if (!["https:", "http:"].includes(parsed.protocol)) {
    setStatus("Only HTTP and HTTPS media links are supported.", false);
    return;
  }
  if (isYoutubeHost(parsed.hostname.toLowerCase())) {
    setStatus("YouTube links cannot be converted here. Use YouTube's official download options or YouTube Studio / Google Takeout for your own videos.", false);
    return;
  }
  if (!permissionCheck.checked) {
    setStatus("Please confirm that you own this media or have permission to download it.", false);
    permissionCheck.focus();
    return;
  }

  const selected = formatSelect.value;
  const path = parsed.pathname.toLowerCase();
  const extMatch = path.match(/\.(mp4|webm|mp3|wav)$/);
  const ext = selected === "auto" ? (extMatch ? extMatch[1] : "") : selected;
  if (selected !== "auto" && extMatch && extMatch[1] !== selected) {
    setStatus("The URL appears to point to a ." + extMatch[1] + " file. Changing the filename extension will not convert the media format.", false);
    return;
  }

  const filenameBase = safeFilename(nameInput.value.trim()) || "vidsnap-download";
  const filename = ext ? filenameBase + "." + ext : filenameBase;
  const anchor = document.createElement("a");
  anchor.href = parsed.href;
  anchor.download = filename;
  anchor.rel = "noopener noreferrer";
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setStatus("Download request sent to your browser. If it opens a new tab or does not start, the file host may block browser downloads; use its official download link.", true);
});
