pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        DOCKERHUB_REPO = "kazirafiulkader/portfolio-image"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKERHUB_REPO}:latest ."
            }
        }
        stage('Tag') {
            steps {
                sh "docker tag ${DOCKERHUB_REPO}:latest ${DOCKERHUB_REPO}:${BUILD_NUMBER}"
            }
        }
        stage('Docker Hub Login') {
            steps {
                sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }
        stage('Push') {
            steps {
                sh "docker push ${DOCKERHUB_REPO}:${BUILD_NUMBER}"
                sh "docker push ${DOCKERHUB_REPO}:latest"
            }
        }
    }
    post {
        always {
            sh "docker logout"
            deleteDir()
        }
    }
}