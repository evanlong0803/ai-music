// api统一导出
import * as pageApi from "./pages/index";
import * as componentsApi from "./components/index";
export default {
    ...pageApi,
    ...componentsApi
}