import { RegexpName, RegexpVersion, WarningMsg } from '../constants';
import { notify } from './notify';

export default function validationChkAction(type: string, postVal: string) {
  const message = type === 'version' ? WarningMsg.INPUT_VERSION_ANOTHER : WarningMsg.INPUT_SPECIAL;
  const regexp = type === 'version' ? RegexpVersion : RegexpName;
  if (regexp.test(postVal)) {
    const rtnVal = postVal.replace(regexp, '');
    notify(message, true, 2000);

    return rtnVal;
  }

  return postVal;
}
