export type VideoAsset = {
  title?: string
  url: string
  poster?: string
  /** Vertical social cut. Posters use a 9:16 frame; playback stays a Drive/YouTube embed. */
  portrait?: boolean
}

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  category: string
  videoUrl?: string | string[]
  videos?: VideoAsset[]
  btsFolder?: string
  reelsFolder?: string
  thumbnail?: string
}

const drive = (id: string) => `https://drive.google.com/file/d/${id}/preview`

export const projects: Project[] = [
  {
    id: 14,
    slug: "instax-iraq",
    title: "Instax Iraq",
    category: "Film",
    description:
      "A vertical film series across Iraq — Al-Mutanabi Street, Babylon, Qasr Al Najmi, and more.",
    thumbnail: "/thumbnails/covers/instax-iraq.jpg",
    videos: [
      {
        title: "Al-Mutanabi Street",
        url: drive("1LxqzIoDXQRxcOhSPpqBQ7uLOpBJa-ZYh"),
        poster: "/thumbnails/instax/al-mutanabi.jpg",
        portrait: true,
      },
      {
        title: "Babylon",
        url: drive("1qPUGFr6R4orHoaGQxmCQoikP-WKPfuep"),
        poster: "/thumbnails/instax/babylon.jpg",
        portrait: true,
      },
      {
        title: "Organic Kathar",
        url: drive("1I9_SKu95kVF5j_e9oinbqdfO8_cVWjJZ"),
        poster: "/thumbnails/instax/organic-kathar.jpg",
        portrait: true,
      },
      {
        title: "Organic Maryam",
        url: drive("1rmVMQF-4sSEmOIqt6CE4fCy89JyFnxdQ"),
        poster: "/thumbnails/instax/organic-maryam.jpg",
        portrait: true,
      },
      {
        title: "Organic Moqtader",
        url: drive("12u7bIi6svGnZnpxRQDxvaoNFDgkiBwOS"),
        poster: "/thumbnails/instax/organic-moqtader.jpg",
        portrait: true,
      },
      {
        title: "Qasr Al Najmi",
        url: drive("1PbXrEssPu912EE3LL6BAi-dAOS4gnoLM"),
        poster: "/thumbnails/instax/qasr-al-najmi.jpg",
        portrait: true,
      },
    ],
  },
  {
    id: 15,
    slug: "rakta-ai-film",
    title: "RAKTA AI Film",
    category: "Film",
    description: "AI film produced for RAKTA.",
    thumbnail: "/thumbnails/covers/rakta-ai-film.jpg",
    videos: [
      {
        title: "RAKTA AI Film",
        url: drive("1hrTGkJwAR5ntB4kODsXP_5BPoZn_gsD0"),
        poster: "/thumbnails/rakta/rakta-ai-film.jpg",
      },
    ],
  },
  {
    id: 16,
    slug: "chalk-beauty-salon",
    title: "CHALK Beauty Salon",
    category: "Beauty / Campaign",
    description: "Campaign films for CHALK Beauty Salon.",
    thumbnail: "/thumbnails/covers/chalk-beauty-salon.jpg",
    videos: [
      {
        title: "Fruity Teaser",
        url: drive("1jhJfNvJgoLV_BaCoWkn9n98iFuM_CzgI"),
        poster: "/thumbnails/chalk/fruity-teaser.jpg",
        portrait: true,
      },
      {
        title: "Before & After",
        url: drive("1DwBtsgDkCQJDCxSjiF1w4dLhcbFYZKH0"),
        poster: "/thumbnails/chalk/before-after.jpg",
        portrait: true,
      },
      {
        title: "CHALK x Salata",
        url: drive("1bG4xg41HN0BDqzgHo0on1_ENf30zBt_6"),
        poster: "/thumbnails/chalk/x-salata.jpg",
        portrait: true,
      },
      {
        title: "Chrome",
        url: drive("1oH770n_bsMuRXJ7CpGzIf4O-osqt2HvB"),
        poster: "/thumbnails/chalk/chrome.jpg",
        portrait: true,
      },
      {
        title: "Fall Hero",
        url: drive("1z2genDg6CWeaUStcXh94j3L2s75bH2-E"),
        poster: "/thumbnails/chalk/fall-hero.jpg",
      },
      {
        title: "Fruity Editorial",
        url: drive("1HLZ6iJibcytEe5D9X-Od67zV_6nTorSq"),
        poster: "/thumbnails/chalk/fruity-editorial.jpg",
        portrait: true,
      },
      {
        title: "Hair Expert",
        url: drive("1gbLfiUY35HMgb_Z2_2T5LzHC7hKgToPT"),
        poster: "/thumbnails/chalk/hair-expert.jpg",
        portrait: true,
      },
      {
        title: "Halloween",
        url: drive("1eAXYS3Ds7DIOgAKW5uYY8uC-eYsUpVfz"),
        poster: "/thumbnails/chalk/halloween.jpg",
        portrait: true,
      },
      {
        title: "Phillip B",
        url: drive("1E-I-uejY8UGGC0LKVA8JRsVcHXv4flGY"),
        poster: "/thumbnails/chalk/phillip-b.jpg",
        portrait: true,
      },
      {
        title: "Photo Match Cut",
        url: drive("1_Glpq4_Qb9e-wx67ldCzuOlzrUf6MBK7"),
        poster: "/thumbnails/chalk/photo-match-cut.jpg",
        portrait: true,
      },
      {
        title: "Sounds Around CHALK",
        url: drive("13RXvM2y6HsYVFWpwYOLJ8iNgywFFmpkY"),
        poster: "/thumbnails/chalk/sounds-around.jpg",
        portrait: true,
      },
    ],
  },
  {
    id: 1,
    slug: "lucid",
    title: "Lucid",
    category: "Commercial",
    description: "Producer with Burson Agency.",
    videoUrl: "https://youtu.be/bns37rr7ytQ",
  },
  {
    id: 2,
    slug: "isuzu-ad",
    title: "Isuzu – Ad",
    category: "Commercial",
    description: "Director assistant on an Isuzu ad.",
    videoUrl: "https://youtu.be/BcNLcqvKfqg",
    btsFolder: "isuzubts",
  },
  {
    id: 3,
    slug: "sing-in-the-sky",
    title: "Sing in The Sky",
    category: "Music / Live Event",
    description: "Director Assistant.",
    videoUrl: "https://shahid.mbc.net/en/shows/Ghannili-Bil-Jaw/show-957168",
    thumbnail: "/thumbnails/sing-in-the-sky.png",
  },
  {
    id: 4,
    slug: "ega-break-the-mold",
    title: "EGA – Break The Mold",
    category: "Commercial",
    description: "Produced 'Break The Mold' campaign video with Burson Agency.",
    videoUrl: "https://youtu.be/z9INTKS8CAw",
  },
  {
    id: 5,
    slug: "centre-point",
    title: "Centre Point",
    category: "Art Direction / Commercial",
    description: "Art Direction alongside Jad Ezzi. Designs on set, end results, and BTS shots.",
    videoUrl: ["https://youtu.be/5rh7CPMHo5Q", "https://youtu.be/OgWyrkQRvxI"],
    btsFolder: "centrepointbts",
  },
  {
    id: 6,
    slug: "boumph-live-session",
    title: "Boumph – Live Session",
    category: "Music / Live Session",
    description: "Recorded a live session with the Syrian rapper Bitter Mouthfeel using 3 Sony a7 IV and a 360 camera.",
    videoUrl: "https://youtu.be/5aVHGmSvLTI?si=uWUPqUjKxujSVJZn",
  },
  {
    id: 7,
    slug: "how-to-series",
    title: "How To Series",
    category: "Educational / Series",
    description: "Created a 10-episode tips series.",
    videoUrl: ["https://youtu.be/TSX9Asn1m6A", "https://youtu.be/n82a5MxMu9Q"],
  },
  {
    id: 8,
    slug: "loccitane-ramadan",
    title: "L'occitane - Ramadan",
    category: "Commercial / Campaign",
    description: "Ramadan campaign for L'occitane. Includes vertical video reels.",
    videoUrl: "https://youtu.be/R88ZT66jsA0",
    btsFolder: "loccitanebts",
    reelsFolder: "loccitanereels",
  },
  {
    id: 9,
    slug: "wedding-promo",
    title: "Wedding Promo",
    category: "Event / Wedding",
    description: "Wedding Promo for Alaa Khashi.",
    videoUrl: "https://youtu.be/uqFkYPU8q7Q",
  },
  {
    id: 10,
    slug: "podcast-advanced-media",
    title: "Podcast with Advanced Media",
    category: "Podcast",
    description: "Hosted an episode of Advanced Podcast at Advanced Media with director Nadine Yasir.",
    videoUrl: [
      "https://drive.google.com/file/d/1wxUXJ7HCdiIq2QkJRoETCeEAarcEZC6h/preview",
      "https://drive.google.com/file/d/18ALQeipVqcdQ3-Y_I1FnLIpCHIIVSYc7/preview",
    ],
    thumbnail: "/thumbnails/podcast-with-advanced-media.png",
  },
  {
    id: 11,
    slug: "advanced-media-campaign",
    title: "Advanced Media Campaign",
    category: "Commercial / Campaign",
    description: "Advanced Media campaign with vertical reels and BTS.",
    btsFolder: "advancedmediabts",
    videoUrl: ["https://drive.google.com/file/d/16zItmXTxmwaN9lx_mh7H4BaLhIHAEDLN/preview"],
    thumbnail: "/thumbnails/advanced-media-campaign.png",
  },
  {
    id: 12,
    slug: "unboxing-canon-r5",
    title: "Unboxing Canon R5",
    category: "Product / Unboxing",
    description: "Unboxing and first impressions of the Canon R5. Includes BTS and vertical reels.",
    btsFolder: "canonr5bts",
    videoUrl: ["https://drive.google.com/file/d/1Q0dDLhVP4QTrAYwmPkpwpYzD2v1fZMqa/preview"],
    thumbnail: "/thumbnails/unboxing-canon-r5.png",
  },
  {
    id: 13,
    slug: "social-reels",
    title: "Social Reels",
    category: "Social / Reels",
    description:
      "Vertical social reels, including Nour Ghandour x Laurance Beauty Salon, fashion week, and brand films.",
    thumbnail: "/thumbnails/covers/nour-ghandour.jpg",
    videos: [
      {
        title: "Nour Ghandour x Laurance Beauty Salon 1",
        url: drive("1pO8MJO5CgZTv6WfkZYPoYednCw7eb560"),
        poster: "/thumbnails/reels/nour-ghandour-laurance-1.jpg",
        portrait: true,
      },
      {
        title: "Nour Ghandour x Laurance Beauty Salon 2",
        url: drive("1Oq0-BrYSpfidX0X_OLmzRV5i4HsZ4Ov8"),
        poster: "/thumbnails/reels/nour-ghandour-laurance-2.jpg",
        portrait: true,
      },
      {
        title: "Dubai Fashion Week A/W 25-26",
        url: drive("1vI4i_8FZ2DqEreeubKN90X7YcaN67N8s"),
        poster: "/thumbnails/reels/dfw-aw-25-26.jpg",
        portrait: true,
      },
      {
        title: "Dyson — Get Show Ready",
        url: drive("12U-OrdZet7eDpI5jmeZOoUSssGRLU-aR"),
        poster: "/thumbnails/reels/dyson-show-ready.jpg",
        portrait: true,
      },
      {
        title: "Dubai Fashion Week SS26",
        url: drive("1-LlkzRL8EY2klRvz4HBP7EeLnAEHAVmj"),
        poster: "/thumbnails/reels/dfw-ss26.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("1ShIRfBK8Lc-Ldnyv1ewUS1ud3HUX_Tvi"),
        poster: "/thumbnails/reels/snapins-1.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("1_-ojVimRT524JsCM1nKvknXpNnXEIfgE"),
        poster: "/thumbnails/reels/snapins-2.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("1ZAvgV-aWyR9O5NP4UebNzhV75iaaF0r_"),
        poster: "/thumbnails/reels/snapins-3.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("1E77P5eDp-tQnf7z-yqXlUZeatu7pXmA6"),
        poster: "/thumbnails/reels/snapins-4.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("186ahLwdIBNhgXVpHMIpl6kKqJdbo3Lyo"),
        poster: "/thumbnails/reels/snapins-5.jpg",
        portrait: true,
      },
      {
        title: "Social Reel",
        url: drive("1CK6oeNkoiNNgjVqMb1Pdax-1NoY37Y8-"),
        poster: "/thumbnails/reels/snapins-6.jpg",
        portrait: true,
      },
      {
        title: "Dubai Internet City — Canon World Unseen",
        url: drive("1lo9lDSeqMBEqhYXtm4vLqPXzoqqrnExX"),
        poster: "/thumbnails/reels/dic-canon-world-unseen.jpg",
        portrait: true,
      },
      {
        title: "Cotti Coffee Dubai",
        url: drive("1O8BAlMrQIcbwidlE-ng7hdFsBwqJiuZj"),
        poster: "/thumbnails/reels/cotti-coffee.jpg",
        portrait: true,
      },
      {
        title: "GITEX — Rashid Al Salmi",
        url: drive("1TuoEeuMeaeXoT7H6Y0PKCd5V5G9QXc4k"),
        poster: "/thumbnails/reels/gitex-rashid.jpg",
        portrait: true,
      },
      {
        title: "Advice to My Younger Self",
        url: drive("1DvTV3ATq1GxhQfd1oZoyLsl6dTwCYSde"),
        poster: "/thumbnails/reels/younger-self.jpg",
        portrait: true,
      },
    ],
  },
]

/** Homepage featured production. New films first. */
export const featuredProductionSlugs = ["instax-iraq", "rakta-ai-film", "chalk-beauty-salon"] as const

export function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/)
  return match ? match[1] : ""
}

export function isYouTube(url: string) {
  return /youtu\.be|youtube\.com/.test(url)
}

export function projectVideos(project: Project): VideoAsset[] {
  if (project.videos?.length) return project.videos
  if (!project.videoUrl) return []
  const urls = Array.isArray(project.videoUrl) ? project.videoUrl : [project.videoUrl]
  return urls.map((url) => ({ url }))
}

export function projectPath(slug: string) {
  return `/production?project=${encodeURIComponent(slug)}`
}

export function posterFor(video: VideoAsset) {
  if (video.poster) return video.poster
  const yt = getYouTubeId(video.url)
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`
  const driveMatch = video.url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w800`
  return ""
}
