import { RegexpName, RegexpVersion } from '../constants';

export default function validationChkAction(type: string, postVal: string) {
  const message =
    type === 'version'
      ? "Only numbers and '.' are allowed as input"
      : "Special characters such as (~,!,#,$,%,^,&,*,(,),_,|,+,\\,-,=,?,;,:,',\",<,>,{,},[,],/,' ') are not allowed.";
  const regexp = type === 'version' ? RegexpVersion : RegexpName;
  if (regexp.test(postVal)) {
    const rtnVal = postVal.replace(regexp, '');
    figma.notify(message, { error: true, timeout: 2000 });
    return rtnVal;
  }

  return postVal;
}
