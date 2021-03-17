export class UserBuzzRoutes {
  public static SIGN_IN_ROUTES = 'sign_in';
  public static SIGN_UP_ROUTES = 'sign_up';
  public static SIGN_OUT_ROUTES = 'sign_out';
  public static USERS_ROUTES = 'users';
  public static USERS_SIGN_IN_ROUTES = '/'.concat(UserBuzzRoutes.USERS_ROUTES).concat('/').concat(UserBuzzRoutes.SIGN_IN_ROUTES);
  public static USERS_SIGN_UP_ROUTES = '/'.concat(UserBuzzRoutes.USERS_ROUTES).concat('/').concat(UserBuzzRoutes.SIGN_UP_ROUTES);
  public static USERS_SIGN_OUT_ROUTES = '/'.concat(UserBuzzRoutes.USERS_ROUTES).concat('/').concat(UserBuzzRoutes.SIGN_OUT_ROUTES);
  public static AUTH_SIGN_IN = '/auth/login';
  public static AUTH_SIGN_OUT = '/auth/logout';
  public static AUTH_SIGN_UP = '/auth/sign_up';

}
