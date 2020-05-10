import * as fromAuth from '../reducers/auth.reducer';
import * as fromLoginPage from '../reducers/login-page.reducer';
import * as fromPrepaid from '../../prepaid-service/reducers/prepaid.reducers';
import * as fromServices from '../../mng-services/reducers/service.reducer';
import * as fromUser from '../../auth/reducers/user.reducer';
import * as fromMedia from '../../media/reducers/media.reducer';
import * as fromShell from '../reducers/layout.reducer';
import * as fromReport from '../../reports/reducers/reports.reducers';


export interface State {
  auth: fromAuth.AuthState;
  loginPage: fromLoginPage.AppState;
  service?: fromServices.AppState;
  user: fromUser.State;
  prepaid: fromPrepaid.AppState;
  shell: fromShell.AppState;
  media: fromMedia.AppState;
  report: fromReport.AppState;
}
