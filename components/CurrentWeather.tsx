import useCurrentWeather from '../hooks/useCurrentWeather'

export default function CurrentWeather() {
  const CurrentWeatherCell = useCurrentWeather()

  const Failure = () => <p>Weather unavailable.</p>
  const Loading = ({ extended: { loadingText } }) => (
    <p className="h-8 flex justify-center items-center">{loadingText}</p>
  )
  const Success = ({ response: weather }) => {
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
  }

  return (
    <CurrentWeatherCell Loading={Loading} Failure={Failure} Success={Success} />
  )
}
