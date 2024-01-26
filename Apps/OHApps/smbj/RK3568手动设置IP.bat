@echo off
echo Current Net Address
hdc shell ifconfig


echo please input Net Address
set /p IP=

echo please input device name
set NAME="eth0"
set /p NAME=


@echo on
hdc shell ifconfig %NAME% %IP% netmask 255.255.255.0 up
@echo off

echo please input netmask address
set ROUTE_IP="192.168.1.1"
set /p ROUTE_IP=
@echo on
hdc shell route add default gw %ROUTE_IP%

@echo off
echo Current Net Address
hdc shell ifconfig
pause
