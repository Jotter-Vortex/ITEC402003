# KALI LINUX

AWS를 이용하여 Kali Linux를 통해 웹 서버의 NVT(Network Vulnerability Test)와 CVE(Common Vulnerabilities and Exposures)를 진단함


# OpenVAS

Kali Linux에서 실행되어 NVT와 CVE를 진단하는 도구


## AWS Kali Linux

ID : kali

PW : kali


service xrdp start

## Kali Linux 사용
- 원격 모니터링 
- $service xrdp start

## OpenVas 에러 해결법
### 동기화 문제
- $sudo -u _gvm gvmd --modify-setting 78eceaec-3385-11ea-b237-28d24461215b --value 80a9329d-a3ae-448b-b350-f827d918a4fb
- $sudo gvm-stop
- $sudo runuser -u _gvm -- greenbone-nvt-sync --rsync
- $sudo greenbone-scapdata-sync 
- $sudo greenbone-certdata-sync
- reboot instance

### 계정 설정
- $sudo gvmd --user=admin --new-password=new_password


## OpenVas 테스트 사이트
- demo.testfire.net
- 65.61.137.117
