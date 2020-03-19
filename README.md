# App

This source code is part of a blogpost about what you need to configure to enable Application Insights with distributed tracing (correlation) for your Angular-Java stack.

More info: [A quick intro: Application Insights for your Angular Java stack](https://yuriburger.net/2019/12/17/a-quick-intro-application-insights-for-your-angular-java-stack/)

To setup the demo:

```
npm install
```

Update the config file to include the correct Instrumentation Key (/assets/config/config.{environment}.json)

```
{
  "environmentName": "develop",
  "endPointApiUrl": "http://localhost:8080",
  "instrumentation": "#{INSTRUMENTATION_KEY}#"
}
```

To run the demo:

```
npm run start
```

and navigate with your browser to http://localhost:4200
