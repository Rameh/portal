/*UNDER ANY CIRCUMSTANCES, BEFORE EDITING THIS FILE, ASK YOUR SUPERVISOR'S PERMISSION. EDITING
THIS FILE WILL EFFECT THE WHOLE SYSTEM.
*/


// CRUD Operation modes
export const PAGE_MODE_CREATE = 'create';
export const PAGE_MODE_EDIT = 'edit';
export const PAGE_MODE_VIEW = 'view';
export const PAGE_MODE_DELETE = 'delete';

// Component Display Modes
export const COMPONENT_PAGE_MODE_CREATE = 'Create';
export const COMPONENT_PAGE_MODE_EDIT = 'Edit';
export const COMPONENT_PAGE_MODE_VIEW = 'View';

//currency format
export const CURRENCY_FORMAT = '$'

//image constants
export const COMPANY_LOGO = 'assets/company_default.jpg';
export const QR_CODE = '../../../assets/QrCode.png';
export const DEFAULT_PERSON_IMAGE = 'assets/default person.jpg';
export const NO_IMAGE = 'assets/img/no-image.png';
export const MARKER_ICON_RETINA = 'assets/marker-icon-2x.png';
export const MARKER_SHADOW = 'assets/marker-shadow.png';
export const MARKER_ICON = 'assets/marker-icon.png';
export const CAMERA_ICON = 'assets/camera.png'

//role constants
export const PRO_ROLE = 'PRO';
export const CUST_ROLE = 'CUST';
export const STAFF_ROLE = 'STAFF';
export const ADMIN_ROLE = 'ADMIN';

//forgot password constants
export const FORGOT_PASSWORD_EMAIL_MODE = 'email';
export const FORGOT_PASSWORD_SELECTION_MODE = 'selectionmode';
export const FORGOT_PASSWORD_VERIFICATION_CODE_MODE = 'code';
export const FORGOT_PASSWORD_PASSWORD_MODE = 'password';

//http status codes
export const SUCCESS_CODE = 200;
export const NOT_FOUND_CODE = 404;
export const UNAUTHORIZED_CODE = 401;
export const ERROR_CODE = 500;
export const VALIDATION_ERROR_CODE = 400;
export const ALREADY_EXIST_CODE = 201;

//http messages
export const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error'
export const NETWORK_ERROR_MSG = 'Network Error'