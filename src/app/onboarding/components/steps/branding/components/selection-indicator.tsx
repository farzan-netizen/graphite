interface SelectionIndicatorProps {
  isSelected: boolean
}

export const SelectionIndicator = ({ isSelected }: SelectionIndicatorProps) => {
  if (!isSelected) return null

  return (
    <div
      className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: '#0AC06C' }}
    />
  )
}
