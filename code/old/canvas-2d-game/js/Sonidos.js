/**********************************/
/* Juan Gabriel Rodr�guez Carri�n */
/*    jlabstudio.com       2011   */
/**********************************/

/**
 * Esta clase es el almac�n de sonidos de nuestro juego.
 * Seguiremos una simulaci�n de patr�n singleton muy simplificado
*/

function SonidosClase(){
	//La lista de objetos Image
	this.lista=[];
	this.length=0;
	/**
	* Este m�todo devolver� el sonido segun la ID proporcionada
	*
	* id es el identificador del sonido para meterlo en la lista
	*/
	this.cargar=function(sonidos){
		if (sonidos.length>0)
		{
			this.length++;
			this.cargando(this.length, this.length+sonidos.length-1);
			var sonido=new Audio();
			sonido.src=sonidos[0][1];
			this.lista[sonidos[0][0]]=sonido;
			sonido.oncanplaythrough=Sonidos.cargar(sonidos.slice(1));
		}
		else
		{
			this.completadoTotal();
		}
	};
	this.cargando=function(actual,total){};
	this.completadoTotal=function(){};
	
	/**
	* Este m�todo reproducir� el sonido especificado con su id
	*
	* id es el identificador del sonido
	*/
	this.play=function(id){
		var sonido=this.lista[id];
		if (sonido){
			sonido.play();
		}
	};
		/**
	* Este m�todo parar� el sonido especificado con su id
	*
	* id es el identificador del sonido
	*/
	this.stop=function(id){
		var sonido=this.lista[id];
		if (sonido){
			sonido.pause();
			sonido.currentTime=0;
		}
	};
}
//Creamos una instancia de la clase Sonidos, que ser� global a todo el programa
//No es exactamente un Singleton, pero la idea y la forma de uso es la misma.
var Sonidos=new SonidosClase();