#-------------------------------------------------
#
# Project created by QtCreator 2015-04-14T15:17:58
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
QT += webkitwidgets

TARGET = qt_audio
TEMPLATE = app


SOURCES += main.cpp\
        audiomainwindow.cpp

HEADERS  += audiomainwindow.h

FORMS    += audiomainwindow.ui

RESOURCES += \
    audio_ressource.qrc
