"use client"

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
    >
      Back
    </button>
  )
}
