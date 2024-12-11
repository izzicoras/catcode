# Catcode

*Docs and syntax contributed by cat.*
<br>
*Interpreter built by izzicoras.*

| Syntax | Explanation | Example |
| -------- | ------- | ------- |
| End     | You mark the end of a command using ```;```.| ```test 1;```|
| Screen  | Sets a list of whole possitive number varibles from 0-9 in a table format of varying sizes, use an end to mark the end of a row | ```[screen]```<br> ```0 0 0 0;```<br> ```0 0 0 0;```<br> ```0 0 0 0;```<br> ```0 0 0 0;```<br> ```[/screen]``` |
| Varibles| You may set or call a varible, either assigning a value to it or using it's assigned value for other logic | ```example```
| Varible assignment| when writeing varible logic, the varible on the left most side of the argument will be written over based off whats writen to the right| ```example 1;``` |
| Varible modification| You can modify the value of varibles rather then setting an exact value, using either ```+```, ```-```, ```*``` or ```/``` for addition, subtraction, multiplication, or division.| ```example + 1;```
| Varible call | You may call another varible inside another document, either using it for internal logic, or writeing over it, depending on if you place the varible on the left or right. <br> You must suround the argument in ```[]```, write the name of the document your calling, followed by a ```.```, then the name of the varible. | ```[Doc.Varible]```|
| Screen varible call | Varible calls may also be used to call for a varible inside of a screen, using the same syntax as with a varible call, but with some slight modifications. <br> To do so, you'll need to name the table your calling, then for the varible name inside another set of ```[]```, define where on the table your calling to, with 2 sets of numbers divided by a ```,```. | ```[Table.[0,0]]```|
| comparison operator| when modifying a varible, you can set a minimum or maximum value to that varible, if your varible doesnt already fall into the specified range, it is set to the specified value. <br> ``>`` and ``<`` are used for this command, ``>`` stating that the varible has to be at least larger, while ``<`` stateing the varible has to be at most smaller | ```Varible > 1;```
