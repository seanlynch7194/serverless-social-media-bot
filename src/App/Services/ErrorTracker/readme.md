# Error Tracker

## Using A Different Error Tracking Service

### Step 1.
Create a new object for your error tracking service that implements the ErrorTracker interface `src/App/Services/ErrorTracker/Domain/ErrorTracker`.

### Step 2.
Finally return your new service in the Error Tracker service provider `src/App/Services/ErrorTracker/Framework/ServiceProvider`.
