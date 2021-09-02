import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout,{
  loaders: {
    profile: "<h1>Loading profile</h1>",
    cart: "<h1>Loading cart</h1>",
  },
  errors: {
    profile: "<h1>Failed to load profile</h1>",
    cart: "<h1>Failed to load cart</h1>",
  },
  props:{}
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
