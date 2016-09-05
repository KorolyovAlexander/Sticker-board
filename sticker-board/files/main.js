var sticker = (function(){
		
	var desktop,
	activeSticker,
	zIndexCount = 1,
	shiftX,
	shiftY;

	document.addEventListener('DOMContentLoaded', init, false);
	
	function init(){
		desktop = document.body;
		desktop.addEventListener('dblclick', addSticker, false);
		desktop.addEventListener('mousedown', mousedown, false);
		document.addEventListener('mousemove', mousemove, false);
		desktop.addEventListener('mouseup', mouseup, false);
		desktop.addEventListener('click', deleteSticker, false);		
	}

	function addSticker(e){
		if(e.target == desktop)
		{
			var temp_sticker = document.createElement('div');
			var temp_button = document.createElement('button');
			temp_button.textContent = 'x';
			var temp_input = document.createElement('input');
			temp_sticker.appendChild(temp_button);
			temp_sticker.appendChild(temp_input);
			temp_sticker.className = 'sticker_body';
			temp_button.className = 'sticker_button';
			temp_input.className = 'sticker_input';
			temp_sticker.ondragstart = function(){
				return false;
			};
			desktop.appendChild(temp_sticker);
			temp_sticker.style.left = e.pageX - temp_sticker.offsetWidth / 2 + 'px';
    			temp_sticker.style.top = e.pageY - temp_sticker.offsetHeight / 2 + 'px';
		}
	}
	
	function mousedown(e){
		var activeElement = e.target;
		if(activeElement.className == 'sticker_body'){
			activeSticker = activeElement;
			shiftX = e.pageX - parseInt(activeSticker.style.left);
			shiftY = e.pageY - parseInt(activeSticker.style.top);
			activeSticker.style.zIndex = zIndexCount++;
		}
	}

	function mousemove(e){
		if(activeSticker){
			activeSticker.style.left = e.pageX - shiftX + 'px';
			activeSticker.style.top = e.pageY - shiftY + 'px';
		}
  	}

	function mouseup(){
    		activeSticker = null;
  	}

	function deleteSticker(e){
		var activeElement = e.target;
		if(activeElement.className == 'sticker_button'){
			activeElement.parentNode.remove();
		}
	}

}());