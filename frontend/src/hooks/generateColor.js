export default function useGenerateColor(){
    console.log("useGenerateColor called")
    
    function generateColor() {
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = Math.floor(Math.random() * 360);
        const hue3 = Math.floor(Math.random() * 360);
        return `hsl(${hue1}, ${hue2}, ${hue3})`;
    }

    function generateIncomeColors(category){
        const saveColor = JSON.parse(localStorage.getItem('income_colors'))

        if(!saveColor[category]){
            saveColor[category] = generateColor()
            localStorage.setItem('income_colors', JSON.stringify(saveColor))
        }
    }

    function generateExpenseColors(category){
        const saveColor = JSON.parse(localStorage.getItem('expense_colors'))

        if(!saveColor[category]){
            saveColor[category] = generateColor()
            localStorage.setItem('expense_colors', JSON.stringify(saveColor))
        }
    }

    return { generateIncomeColors, generateExpenseColors }
}