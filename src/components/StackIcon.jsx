import Tooltip from './Tooltip'

// Monochrome logos are drawn as a CSS mask so they follow the text color in both themes.
export default function StackIcon({ item, className = 'h-7 w-7 sm:h-9 sm:w-9' }) {
  const shared = `${className} cursor-pointer object-contain transition-transform duration-200 hover:scale-110`
  return (
    <Tooltip label={item.name}>
      {item.mono ? (
        <span
          role="img"
          aria-label={item.name}
          tabIndex={0}
          className={`${shared} block bg-fg`}
          style={{
            WebkitMask: `url(${item.icon}) center / contain no-repeat`,
            mask: `url(${item.icon}) center / contain no-repeat`,
          }}
        />
      ) : (
        <img src={item.icon} alt={item.name} width="36" height="36" loading="lazy" tabIndex={0} className={shared} />
      )}
    </Tooltip>
  )
}
