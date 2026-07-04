import { useEffect, useState } from "react";

export type LanyardData = {
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
      start: number;
      end: number;
    };
  } | null;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    name: string;
    type: number;
    details?: string;
    state?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
};

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || userId === "YOUR_DISCORD_USER_ID") {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Lanyard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading };
}
