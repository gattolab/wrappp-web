import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #3B5BDB, #6366F1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path
            d="M7.5 10.5C7.83 10.91 8.25 11.24 8.72 11.47C9.19 11.71 9.7 11.85 10.23 11.87C10.75 11.9 11.28 11.82 11.77 11.63C12.27 11.44 12.71 11.15 13.09 10.78L15.09 8.78C15.76 8.08 16.13 7.14 16.13 6.17C16.12 5.2 15.73 4.27 15.04 3.58C14.34 2.89 13.42 2.5 12.45 2.49C11.48 2.48 10.54 2.86 9.84 3.53L8.68 4.68"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 7.5C10.17 7.09 9.75 6.76 9.28 6.53C8.81 6.29 8.3 6.15 7.77 6.13C7.25 6.1 6.72 6.18 6.23 6.37C5.73 6.56 5.29 6.85 4.91 7.22L2.91 9.22C2.24 9.92 1.87 10.86 1.87 11.83C1.88 12.8 2.27 13.73 2.96 14.42C3.66 15.11 4.58 15.5 5.55 15.51C6.52 15.52 7.46 15.14 8.16 14.47L9.31 13.32"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
