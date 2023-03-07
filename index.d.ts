export {}

declare global {
  namespace koorie_solidjs {
    type cb_argument = { [object:string]: object|never } & string & number & boolean & never
  }
}