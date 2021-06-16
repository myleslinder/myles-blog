import useCurrentWeather from '../hooks/useCurrentWeather'

export default function CurrentWeather() {
  const { weather, status, loadingText, error } = useCurrentWeather()

  if (status === 'IDLE') {
    return null
  }
  if (status === 'PENDING') {
    return <p className="h-8 flex justify-center items-center">{loadingText}</p>
  }
  if (status === 'RESOLVED') {
    return (
      <div className="flex justify-center items-center">
        <p>{weather.formattedDescription}</p>
        <img
          src={weather.iconUrl}
          alt={weather.formattedDescription}
          className="h-8 w-8"
        />
        <p>{weather.formattedTemp}</p>
      </div>
    )
  } else if (status === 'ERROR') {
    console.error(error)
    return <p>Weather unavailable.</p>
  }
}
