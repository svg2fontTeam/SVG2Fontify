export const PluginMessageEnum = {
  SUBMIT: 'SUBMIT',
  SELECTED_SVGS: 'SELECTED_SVGS',
  SAVE_ICONFONT: 'SAVE_ICONFONT',
  CHECK_VALUE: 'CHECK_VALUE',
  CHECKED_VALUE: 'CHECKED_VALUE',
} as const;

export const UNICODE = 0xea01;

export const RegexpName = /[`~!#$%^&*()_|+\-=,.?;:'"<>{}[\]\\/\s]/gim;

export const RegexpVersion = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣`~!@#$%^&*()_|+\-=,?;:'"<>{}[\]\\/\s]/gim;

export const WarningMsg = {
  INPUT_SPECIAL:
    "Special characters such as (~,!,#,$,%,^,&,*,(,),_,|,+,\\,-,=,?,;,:,',\",<,>,{,},[,],/,' ') are not allowed.",
  INPUT_VERSION_ANOTHER: "Only numbers and '.' are allowed as input",
  SELECT_ZERO: 'Please select one or more SVG files.',
} as const;
