#include "audiomainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    AudioMainWindow w;
    w.show();

    return a.exec();
}
