#ifndef AUDIOMAINWINDOW_H
#define AUDIOMAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class AudioMainWindow;
}

class AudioMainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit AudioMainWindow(QWidget *parent = 0);
    ~AudioMainWindow();

private:
    Ui::AudioMainWindow *ui;

private slots:
    void loadFinished(bool result);
    void htmlAction1();
};

#endif // AUDIOMAINWINDOW_H
