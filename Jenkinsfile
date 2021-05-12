node('robxtask-jenkins-slave') {

    // -----------------------------------------------
    // --------------- Staging Branch ----------------
    // -----------------------------------------------
  
    if (env.BRANCH_NAME == 'staging') {

        stage('Clone and Update') {
            git(url: 'https://github.com/ROBxTASK/frontend-service.git', branch: env.BRANCH_NAME)
        }
      

        stage('Build Application - staging') {
            sh 'mvn clean install -Denv=staging'
        }

        stage('Build Docker - staging') {
            sh 'docker build -t robxtask/frontend-service:staging ./target'
        }

        stage('Push Docker - staging') {
            sh 'docker push robxtask/frontend-service:staging'
        }

        stage('Deploy - staging') {
            sh 'ssh staging "cd /srv/docker-setup/staging/ && ./run-staging.sh restart-single frontend-service"'
        }
    }

    // -----------------------------------------------
    // ---------------- Master Branch ----------------
    // -----------------------------------------------
    if (env.BRANCH_NAME == 'main') {

        stage('Clone and Update') {
            git(url: 'https://github.com/ROBxTASK/frontend-service.git', branch: env.BRANCH_NAME)
        }

        stage('Build Application') {
            sh 'mvn clean install -Denv=prod'
        }
    }

    // -----------------------------------------------
    // ---------------- Release Tags -----------------
    // -----------------------------------------------
    if( env.TAG_NAME ==~ /^\d+.\d+.\d+$/) {

        stage('Clone and Update') {
            git(url: 'https://github.com/ROBxTASK/frontend-service.git', branch: 'master')
        }

        stage('Set version') {
            sh 'mvn versions:set -DnewVersion=' + env.TAG_NAME
        }

        stage('Build Application - ' + env.TAG_NAME) {
            sh 'mvn clean install -Denv=prod'
        }

        stage('Build Docker - ' + env.TAG_NAME) {
            sh 'docker build -t robxtask/frontend-service ./target'
        }

        stage('Push Docker - ' + env.TAG_NAME) {
            sh 'docker push robxtask/frontend-service:latest'
            sh 'docker tag robxtask/frontend-service:latest robxtask/frontend-service:' + env.TAG_NAME
            sh 'docker push robxtask/frontend-service:' + env.TAG_NAME
        }

        stage('Deploy - ' + env.TAG_NAME) {
            // FIXME: sh 'ssh robxtask "cd /data/deployment_setup/prod/ && export COMPOSE_HTTP_TIMEOUT=600 && sudo ./run-prod.sh restart-single frontend-service"'
        }

    }
}
