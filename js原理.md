## 闭包

##### mdn上说
函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。

##### JavaScript高级程序设计这么说
闭包是指有权访问另一个函数作用域中的变量的函数。

##### 你不知道的JavaScript这么说
当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

##### 一个简单的闭包例子

	function init() {
	  var name = "hello"; // name 是一个被 init 创建的局部变量
	  function displayName() { // displayName() 是内部函数，一个闭包
	    console.log(name); // 使用了父函数中声明的变量
	  }
	  displayName();
	}
	init();

init() 创建了一个局部变量 name 和一个名为 displayName() 的函数。  
displayName() 是定义在 init() 里的内部函数，并且仅在 init() 函数体内可用。  
请注意，displayName() 没有自己的局部变量。  
然而，因为它可以访问到外部函数的变量，所以 displayName() 可以使用父函数 init() 中声明的变量 name 。  

	function waitSomeTime(msg, time) {
		setTimeout(function () {
			console.log(msg)
		}, time);
	}
	waitSomeTime('hello', 1000);

定时器中有一个匿名函数，该匿名函数就有涵盖waitSomeTime函数作用域的闭包，因此当1秒之后，该匿名函数能输出msg。

还有一个比较经典的问题，定时器延时打印：

	for (var i = 1; i <= 10; i++) {
		setTimeout(function () {
			console.log(i);
		}, 1000);
	}

在这段代码中，我们对其的预期是输出1~10，但却输出10次11。  
这是因为setTimeout中的匿名函数执行的时候，for循环都已经结束了，for循环结束的条件是i大于10，所以当然是输出10次11咯。  
究其原因：i是声明在全局作用中的，定时器中的匿名函数也是执行在全局作用域中，那当然是每次都输出11了。  
原因知道了，解决起来就简单了，我们可以让i在每次迭代的时候，都产生一个私有的作用域，在这个私有的作用域中保存当前i的值。  

	for (var i = 1; i <= 10; i++) {
		(function () {
			var j = i;
			setTimeout(function () {
				console.log(j);
			}, 1000);
		})();
	}

##### 循环创建闭包会出现一个常见的错误
	<p id="help">Helpful notes will appear here</p>
	<p>E-mail: <input type="text" id="email" name="email"></p>
	<p>Name: <input type="text" id="name" name="name"></p>
	<p>Age: <input type="text" id="age" name="age"></p>

	function showHelp(help) {
	  document.getElementById('help').innerHTML = help;
	}
	
	function setupHelp() {
	  var helpText = [
	      {'id': 'email', 'help': 'Your e-mail address'},
	      {'id': 'name', 'help': 'Your full name'},
	      {'id': 'age', 'help': 'Your age (you must be over 16)'}
	    ];
	
	  for (var i = 0; i < helpText.length; i++) {
	    var item = helpText[i];
	    document.getElementById(item.id).onfocus = function() {
	      showHelp(item.help);
	    }
	  }
	}
	
	setupHelp(); 

数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的input 的 ID。通过循环这三项定义，依次为相应input添加了一个 onfocus 事件处理函数，以便显示帮助信息。  

运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个input上，显示的都是关于年龄的信息。  

原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。这是因为变量item使用var进行声明，由于变量提升，所以具有函数作用域。当onfocus的回调执行时，item.help的值被决定。由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。

##### 使用函数工厂解决这个问题
	
	function showHelp(help) {
	  document.getElementById('help').innerHTML = help;
	}
	
	function makeHelpCallback(help) {
	  return function() {
	    showHelp(help);
	  };
	}
	
	function setupHelp() {
	  var helpText = [
	      {'id': 'email', 'help': 'Your e-mail address'},
	      {'id': 'name', 'help': 'Your full name'},
	      {'id': 'age', 'help': 'Your age (you must be over 16)'}
	    ];
	
	  for (var i = 0; i < helpText.length; i++) {
	    var item = helpText[i];
	    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
	  }
	}
	
	setupHelp(); 

这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境，makeHelpCallback 函数为每一个回调创建一个新的词法环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

##### 还可以使用匿名闭包

	function showHelp(help) {
	  document.getElementById('help').innerHTML = help;
	}
	
	function setupHelp() {
	  var helpText = [
	      {'id': 'email', 'help': 'Your e-mail address'},
	      {'id': 'name', 'help': 'Your full name'},
	      {'id': 'age', 'help': 'Your age (you must be over 16)'}
	    ];
	
	  for (var i = 0; i < helpText.length; i++) {
	    (function() {
	       var item = helpText[i];
	       document.getElementById(item.id).onfocus = function() {
	         showHelp(item.help);
	       }
	    })(); // 马上把当前循环项的item与事件回调相关联起来
	  }
	}
	
	setupHelp();

##### 如果不想使用闭包，可以使用es6的let

	function showHelp(help) {
	  document.getElementById('help').innerHTML = help;
	}
	
	function setupHelp() {
	  var helpText = [
	      {'id': 'email', 'help': 'Your e-mail address'},
	      {'id': 'name', 'help': 'Your full name'},
	      {'id': 'age', 'help': 'Your age (you must be over 16)'}
	    ];
	
	  for (var i = 0; i < helpText.length; i++) {
	    let item = helpText[i];
	    document.getElementById(item.id).onfocus = function() {
	      showHelp(item.help);
	    }
	  }
	}
	
	setupHelp();