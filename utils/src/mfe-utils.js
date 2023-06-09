import { createStore } from "zustand/vanilla"
const API_KEY = "f018453c03bd48f898d145316232305"

export const useGlobalStore = createStore((set) => ({
	theme: "light",
	cities: ["Riga"],
	selectedCity: "Riga",
	toggleTheme: () =>
		set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
	addCity: (city) =>
		set((state) => {
			const prevCities = state.cities.map((city) => city.toLowerCase())
			const updated = new Set([...prevCities, city.toLowerCase()])
			return { cities: [...updated] }
		}),
	setSelectedCity: (selectedCity) => set(() => ({ selectedCity })),
	removeCity: (city) =>
		set((state) => {
			if (
				state.selectedCity &&
				city.toLowerCase() === state.selectedCity.toLowerCase()
			) {
				return { selectedCity: null }
			}
			const prevCities = state.cities.filter(
				(prevCity) => prevCity.toLowerCase() !== city.toLowerCase()
			)

			return { cities: [...prevCities] }
		}),
	fetchWeatherData: async (cityName) => {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=14&aqi=no&alerts=no`
		)
		return await response.json()
	}
}))
