import {File, RightCheckmark} from '@assets/Icons';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import {DocumentPickerResponse, pick} from '@react-native-documents/picker';
import {scaleWidth, scaleHeight, scaleFont} from '@utils/Scale';
import {tryCatch} from '@utils/TryCatch';
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

export const UploadModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: (file?: DocumentPickerResponse) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<
    DocumentPickerResponse | undefined
  >();

  const handleBrowseFile = async () => {
    const {data, error} = await tryCatch(
      pick({
        mode: 'import',
        allowMultiSelection: false,
      }),
    );
    if (!error) {
      setSelectedFile(data[0]);
    }
  };

  const handleSubmit = () => {
    onClose(selectedFile);
  };
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Outside modal pressed - closing');
          onClose();
        }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('Inside modal - do not close');
            }}>
            <View style={styles.popup}>
              <Text style={styles.title}>Upload your File</Text>
              <Text style={styles.subtitle}>Supports JPG, PNG and PDF</Text>

              <View style={styles.uploadBox}>
                <File width={20} height={26} />
                <Text style={styles.info}>Max file size 15MB</Text>
                <Text style={styles.info}>Drag & Drop your file or</Text>

                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.browseButton}
                    onPress={handleBrowseFile}>
                    <Text style={styles.browseText}>Browse File</Text>
                  </TouchableOpacity>

                  {selectedFile && (
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                      <Text
                        style={{
                          marginTop: 8,
                          color: Colors.balancedGray,
                          fontSize: scaleFont(14),
                        }}>
                        Selected: {selectedFile.name}
                      </Text>

                      {selectedFile.type?.startsWith('image/') ? (
                        <View
                          style={{
                            borderRadius: 8,
                            overflow: 'hidden',
                            borderColor: '#ccc',
                            borderWidth: 1,
                          }}>
                          <Image
                            source={{uri: selectedFile.uri}}
                            style={{
                              width: 150,
                              height: 150,
                              resizeMode: 'cover',
                            }}
                          />
                        </View>
                      ) : selectedFile.name?.endsWith('.pdf') ? (
                        <Text
                          style={{
                            color: Colors.lightGray,
                            fontSize: scaleFont(12),
                          }}>
                          📄 PDF Preview: {selectedFile.name}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: Colors.lightGray,
                            fontSize: scaleFont(12),
                          }}>
                          Unsupported file type
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.7}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={styles.saveText}>Submit</Text>
                <RightCheckmark width={12} height={12} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {fontSize: 20, fontWeight: '600', marginBottom: 4},
  subtitle: {fontSize: 14, color: '#666', marginBottom: 16},
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
  icon: {width: 40, height: 40, marginBottom: 10},
  info: {fontSize: 14, color: '#666', textAlign: 'center'},
  browseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  browseText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(4),
    gap: scaleWidth(8),
    borderWidth: 1,
    borderColor: Colors.green,
    minWidth: scaleWidth(100),
  },
  saveText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(14),
  },
});
