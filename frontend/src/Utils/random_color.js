const COLORS = {
	green: {
		bg: "bg-[#ECF7D4]",
		border: "border-[#92c229]",
	},
	orange: {
		bg: "bg-[#F9EFE1]",
		border: "border-[#fab95e]",
	},
	red: {
		bg: "bg-[#FBE5E7]",
		border: "border-[#f98d96]",
	},
};

export const getRandomColor = () => {
	const colorNames = Object.keys(COLORS); 
	const randomIndex = Math.floor(Math.random() * colorNames.length); 
	const randomColorName = colorNames[randomIndex]; 
	return COLORS[randomColorName]; 
};