# TurtleFrameWork
A bundle of javascript utils for my needs
___
## Functions
### Funzioni 
- ***loadJS(url)*** \
  Carica ed esegue uno script localizato dall' `url`
- ***log(..._)*** \
  Richiama `console.log` passandogli un array contenente tutti gli argomenti passati e restituisce il primo di essi
- ___range*(a, b, c, l)___ \
  Restituisce un generatore che itererà i valori compresi in [a,b] estremi **inclusi**

### Funzioni per `String`
- `String.`***hash()*** \
  restituisce l'hash della stringa
- `String.`***f(..._)*** \
  formatta la stringa cambiando ogni valore `'{i}'` nella stringa nel valore in posizione `i` in `_`
- `String.`***format(args)*** \
  formatta la stringa cambiando ogni valore `'{key}'` nella stringa nel valore di chiave `key` in `args`

### Funzioni per `Array`
- `Array.`___iterate*(a, b, c)___ \
  restituisce un iteratore degli elementi nell'array compresi nel range definito dalla funzione `range(a,b,c,this.length)`
- `Array.`***get(a, b, c)*** \
  restituisce l'array degli elementi iterati tramite `Array.`___iterate___
