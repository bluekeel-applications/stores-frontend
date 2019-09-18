# Store-Picker

An App to find BestBuy locations nearest a ZipCode.

## App Setup

This is a React app. There is a chance that we will need to eject the app from the managed flow, however if we can avoid this it's for the better as releasing updates is very easy.

## Running Locally

First, make sure you have the most up-to-date version of `yarn` by running `brew upgrade yarn`.

Getting the app setup locally is quite simple. After cloning the repo and installing all dependencies with `yarn`, run `yarn start`. This will start the development server in the terminal window that you run it in.

## Publishing Updates

Publishing bundle updates to the S3 bucket is very straightforward. Simply run deployment scripts from the root of the project.

1. Create production build.

    ```
    $ yarn predeploy
    ```

2. Remove old build log and deploy new build to AWS S3.

    ```
    $ yarn deploy
    ```

3. Invalidate old CloudFront distribution.

    ```
    $ yarn postdeploy
    ```

## Testing

Jest. More info coming soon.
