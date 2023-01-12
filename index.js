const firstValue = document.querySelector('.firstValue');
const secondValue = document.querySelector('.secondValue');
firstValue.oninput = () =>{
	document.getElementById('result').textContent = Number(firstValue.value) + Number(secondValue.value);
};
secondValue.oninput = () =>{
	document.getElementById('result').textContent = Number(firstValue.value) + Number(secondValue.value);
};