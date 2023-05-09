import { useGlobalStore } from "@mfe/utils"
import { useStore } from "zustand"

// const Root = (props) => {
// 	const theme = useGlobalStore.subscribe("theme")
// 	console.log("store", theme.theme)
// 	// console.log("store", useGlobalStore.getState().theme)
// 	return <section>{props.name} is mounted!123</section>
// }

import React, { useState } from "react"
import "./index.css"

const getIconUrl = (theme) =>
	theme === "light"
		? "https://img.icons8.com/ios-filled/50/null/moon-symbol.png"
		: "https://img.icons8.com/material-outlined/48/null/sun--v3.png"
const getTogglerLabel = (theme) => (theme === "light" ? "Dark" : "Light")

function Header() {
	const useBoundStore = (selector) => useStore(useGlobalStore, selector)
	const theme = useBoundStore((state) => state.theme)
	const toggleTheme = useBoundStore((state) => state.toggleTheme)
	const addCity = useBoundStore((state) => state.addCity)
	const [city, setCity] = useState("")
	// const { toggleTheme, theme, addCity } = useGlobalStore.getState()
	const handleAddCity = () => {
		addCity(city)
		setCity("")
	}
	return (
		<div className={`header_container header_container_${theme} `}>
			<div>
				<input
					className={`city_input city_input_${theme}`}
					placeholder="City"
					value={city}
					onChange={(event) => setCity(event.target.value)}
				/>
				<button className="default_button" onClick={handleAddCity}>
					Add City
				</button>
			</div>
			<div>
				<button className="default_button toggle_btn" onClick={toggleTheme}>
					<img
						className="toggle_btn_icon"
						src={getIconUrl(theme)}
						alt="moon icon"
					/>
					{getTogglerLabel(theme)} theme
				</button>
			</div>
		</div>
	)
}

export default Header
