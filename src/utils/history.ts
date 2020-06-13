/** History
 *
 * Global browser/window history object that can be used outside of router components.
 * Used to programmatically redirect the user.
 *
 * https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components
 **/

import { createBrowserHistory } from 'history';
export default createBrowserHistory();