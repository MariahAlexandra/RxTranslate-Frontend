/*
 * action types
 */

export const SAVE_JOB_IMAGE = 'SAVE_JOB_IMAGE'

// /*
//  * other constants
//  */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */

export function saveJobImage(imageObject){
    return { type: SAVE_JOB_IMAGE, imageObject }
}