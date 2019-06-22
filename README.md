# TurtleFrameWork
A bundle of javascript utils for my needs
___
## Functions
### Funzioni 
- ***loadJS(url)*** \
  Carica ed esegue uno script localizato dall'`url`
- ***log(..._)*** \
  Richiama `console.log` passandogli un array contenente tutti gli argomenti passati e restituisce il primo di essi
- ***range(a, b, c, l)*** \
  Restituisce un generatore che itererà i valori compresi in [a,b] estremi **inclusi**
- ***HTMLEscape(v)*** \
  Fa l'escape della stringa passata in entità **HTML**
- ***HTMLUnescape(v)*** \
  Fa l'unescape delle entità **HTML** nella stringa passata
___
### Funzioni per `String`
- `String.`***hash()*** \
  restituisce l'hash della stringa
- `String.`***f(..._)*** \
  formatta la stringa cambiando ogni valore `'{i}'` nella stringa nel valore in posizione `i` in `_`
- `String.`***format(_)*** \
  formatta la stringa cambiando ogni valore `'{key}'` nella stringa nel valore di chiave `key` in `_`
___
### DataStructures
#### Additional functions for Array
- `Array.`***iterate(a, b, c)*** \
  restituisce un iteratore degli elementi nell'array compresi nel range definito dalla funzione `range(a,b,c,this.length)`
- `Array.`***get(a, b, c)*** \
  restituisce l'array degli elementi iterati tramite `Array.`***iterate(a, b, c)***
- `peekPop`***peekPop()*** \
  restituisce l'ultimo elemento dell'array senza rimuoverlo
- `peekShift`***peekShift()*** \
  restituisce il primo elemento dell'array senza rimuoverlo
___
#### PriorityQueue