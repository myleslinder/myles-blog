export const getCurrentDateString = () =>
  new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  })

export const getCurrentTimeString = () =>
  new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
  })
