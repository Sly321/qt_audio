#include "audiomainwindow.h"
#include "ui_audiomainwindow.h"
#include <QWebFrame>
#include <QDebug>

AudioMainWindow::AudioMainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::AudioMainWindow)
{
    ui->setupUi(this);
    ui->webView->load(QUrl(QString("qrc:/html/index.html")));

    connect(ui->webView, SIGNAL(loadFinished(bool)), this, SLOT(loadFinished(bool)));
    connect(ui->pushButton, SIGNAL(clicked()), this, SLOT(htmlAction1()));
}

void AudioMainWindow::loadFinished(bool result) {
    QVariant f1result = ui->webView->page()->mainFrame()->evaluateJavaScript("var bla = 1;");
    qDebug() << "LoadFinishedResult: " << f1result;
}

void AudioMainWindow::htmlAction1() {
     QVariant f1result = ui->webView->page()->mainFrame()->evaluateJavaScript("alert('button1');");
     qDebug() << "LoadFinishedResult: " << f1result;
}

AudioMainWindow::~AudioMainWindow()
{
    delete ui;
}
