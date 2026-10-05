import axios from "axios";
import { API_URL } from "./ApiUrl";
import { getToken } from "./Auth.Jsx";
import { coverMimeForFile, demoTypeForFile } from "./projectMedia";

export async function uploadProjectMedia(file, kind) {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: config } = await axios.get(`${API_URL}/projeto/media-config`, { headers });

  if (config.provider === "blob") {
    const { upload } = await import("@vercel/blob/client");
    const extension = file.name.split(".").pop().toLowerCase();
    const contentType = kind === "cover" ? coverMimeForFile(file) : { gif: "image/gif", mp4: "video/mp4", webm: "video/webm" }[extension];
    const pathname = `${kind === "cover" ? "project-covers" : "project-demos"}/${crypto.randomUUID()}.${extension}`;
    const blob = await upload(pathname, file, {
      access: "public",
      contentType,
      multipart: file.size > 4 * 1024 * 1024,
      handleUploadUrl: `${API_URL}/projeto/blob-upload`,
      clientPayload: JSON.stringify({ token }),
    });
    return kind === "cover" ? { coverImage: blob.url } : { demoUrl: blob.url, demoType: demoTypeForFile(file) };
  }

  if (config.provider !== "local") throw new Error("O armazenamento de mídias não está disponível.");
  const body = new FormData();
  body.append(kind, file);
  const { data } = await axios.post(`${API_URL}/projeto/${kind}`, body, { headers });
  return data;
}
