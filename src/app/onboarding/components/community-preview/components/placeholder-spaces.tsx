interface PlaceholderSpacesProps {
  isDark: boolean
}

export const PlaceholderSpaces = ({ isDark }: PlaceholderSpacesProps) => {
  const placeholderBg = isDark ? '#404040' : '#f3f4f6'

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-xs sm:text-sm">
        <div
          className="h-4 w-4 shrink-0 rounded"
          style={{ backgroundColor: placeholderBg }}
        />
        <div
          className="h-3 w-16 rounded"
          style={{ backgroundColor: placeholderBg }}
        />
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-xs sm:text-sm">
        <div
          className="h-4 w-4 shrink-0 rounded"
          style={{ backgroundColor: placeholderBg }}
        />
        <div
          className="h-3 w-20 rounded"
          style={{ backgroundColor: placeholderBg }}
        />
      </div>
    </>
  )
}
