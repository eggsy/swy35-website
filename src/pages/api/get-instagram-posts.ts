import type { NextApiRequest, NextApiResponse } from "next";

export interface InstagramPost {
  id: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption: string;
}

const igApi = <T>(url: string) =>
  fetch(
    `https://graph.instagram.com/${url}&access_token=${process.env.INSTAGRAM_TOKEN}`
  ).then((res) => res.json()) as Promise<T>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InstagramPost[] | { error: string }>
) {
  try {
    const data = await igApi<{ data: InstagramPost[] }>(
      "/me/media?fields=id,media_type,media_url,caption,thumbnail_url,permalink&limit=8"
    );

    res.status(200).json(data.data);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
