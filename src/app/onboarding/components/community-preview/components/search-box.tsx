import type { Theme } from '../type'

interface SearchBoxProps {
  theme: Theme
}

export const SearchBox = ({ theme }: SearchBoxProps) => (
  <div className="flex flex-1 justify-center">
    <div className="relative w-full max-w-xs">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
        <svg
          className="h-3.5 w-3.5"
          style={{ color: theme.textTertiary }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full rounded-md border py-1.5 pr-3 pl-8 text-xs focus:outline-none"
        style={{
          backgroundColor: theme.inputBg,
          borderColor: theme.border,
          color: theme.text,
        }}
        placeholder="Search..."
        disabled
      />
    </div>
  </div>
)
