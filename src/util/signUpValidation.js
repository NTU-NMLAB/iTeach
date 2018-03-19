export default function signUpValidation(loginState)
{
  //判斷是否有填寫身份
  if(loginState.status == ''){
    return {
      valid: false,
      description: "身份欄未填寫。"
    };
  } else if (!checkUserName(loginState.username).valid){ //判斷暱稱格式
    return checkUserName(loginState.username);
  } else { //判斷E-mail格式
    return checkEmail(loginState.email,loginState.status);
  }
}

function checkUserName(username){
  //正則表達式：開頭僅能為英文或中文，內容為中英文、數字與部分符號的組合
  var regExp = /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_@#$%^&*<>+=\-]*$/;
  if (username == '' || username == null){ //判斷是否有填寫暱稱
    return {
      valid: false,
      description: "暱稱欄未填寫。"
    };
  } else if (!regExp.test(username)){ //判斷是否符合暱稱格式
    return {
      valid: false,
      description: "開頭不得為數字和符號，暱稱欄只允許中英文、數字或[-,_,@,#,$,%,^,&,*,<,>,+,=]的組合。"
    }
  } else { //滿足暱稱格式的要求
    return {
      valid: true,
      description: null
    }
  } 
}

function checkEmail(email, status){
  var ntuEmail = '@ntu.edu.tw'; //臺大信箱格式
  //正則表達式用以判斷學生的學號格式
  //關於學號格式，參見：http://www.aca.ntu.edu.tw/aca2012/reg/services/serno.htm
  var regExpStudent = /^[brdetacsyzpjfqhkmn]{1}[0-9]{2}[1-9abe]{1}[0-9]{5}/i; 
  if (email == '' || email == null){ //判斷是否填寫E-mail
    return {
      valid: false,
      description: "E-mail欄未填寫。"
    };
  } else if (!email.match(ntuEmail)) { //判斷是否為臺大信箱
    return {
      valid: false,
      description: "E-mail須符合臺大信箱格式"
    }
  } else {
    if(status == 'student'){ //判斷是否為學生，若為學生則檢查其學號格式
      if(!regExpStudent.test(email)){ // 不滿足學號格式
        return {
          valid: false,
          description: "E-mail學號須符合臺大學號格式"
        }
      }
      else { //符合學號格式
        return {
          valid: true,
          description: null
        }
      }
    } else { //若身份是教師，則不須進一步檢查
      return {
        valid: true,
        description: null
      }
    }
  }
}