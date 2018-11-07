let num : number = 1;
let list: number[];



interface ICustomConsole {
  log(arg: string) : void;
}

type primaryArry = Array<string|number|boolean>

function show(arg: primaryArry) :void {
  console.log(arg);
}

show([123,456])

class CustomConsole implements ICustomConsole {
  log(arg) {
    console.log(arg)
  }
}

declare var customConsole : ICustomConsole;


enum AlterLevel {
  info,
  warning,
  error
}

function getAlertSubscribers(level: AlterLevel) {
  var emails = new Array<string>();
  switch(level) {
    case AlterLevel.info: 
      emails.push('liuhuan@133.cn');
      break;
    case AlterLevel.warning:
      emails.push('levuon@163.com');
      emails.push('levuonliu@gmail.com');
      break;
    case AlterLevel.error:
      emails.push('642752282@qq.com');
      break;
    default: 
      throw new Error('Invalid level')  
  }
  return emails;
}

console.log(getAlertSubscribers(AlterLevel.info));
