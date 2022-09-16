export const environment = {
  appName: "Capi Explorer",
  production: false,
  capiEndpoint: "https://localhost:8380",
  cachedApiEndpoint: "/manager/api/cached/",
  allRoutesEndpoint: "/analytics/jolokia/read/org.apache.camel:context=capi-load-balancer,type=routes,name=*",
  certificatesEndpoint: "/manager/certificate/",
  statisticsEndpoint: "/analytics/jolokia/read/org.apache.camel:context=capi-load-balancer,type=context,name=\"capi-load-balancer\""
};